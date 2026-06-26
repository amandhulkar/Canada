const mongoose = require("mongoose");

const backfillCompanyIds = async () => {
  const User = require("../models/User");
  const Client = require("../models/Client");
  const Project = require("../models/Project");
  const Invoice = require("../models/Invoice");
  const Template = require("../models/Template");

  const users = await User.find({
    $or: [{ companyId: { $exists: false } }, { companyId: null }],
  });

  for (const user of users) {
    if (user.createdBy) {
      const creator = await User.findById(user.createdBy).select("companyId");
      user.companyId = creator?.companyId || user.createdBy;
    } else {
      user.companyId = user._id;
    }
    await user.save();
  }

  const usersById = await User.find({}).select("companyId");
  const companyByUser = new Map(usersById.map((user) => [String(user._id), user.companyId || user._id]));

  const backfillOwnedCollection = async (Model, ownerField) => {
    const docs = await Model.find({
      $or: [{ companyId: { $exists: false } }, { companyId: null }],
      [ownerField]: { $exists: true, $ne: null },
    });

    for (const doc of docs) {
      const companyId = companyByUser.get(String(doc[ownerField]));
      if (!companyId) continue;
      doc.companyId = companyId;
      await doc.save();
    }
  };

  await backfillOwnedCollection(Client, "createdBy");
  await backfillOwnedCollection(Project, "user");
  await backfillOwnedCollection(Invoice, "user");
  await backfillOwnedCollection(Template, "createdBy");

  const clients = await Client.find({ companyId: { $exists: true, $ne: null } });

  for (const client of clients) {
    const email = client.email?.toLowerCase().trim();
    let linkedUser = client.user ? await User.findById(client.user) : null;

    if (!linkedUser && email) {
      linkedUser = await User.findOne({ email });
      if (linkedUser) {
        client.user = linkedUser._id;
        await client.save();
      }
    }

    if (!linkedUser) continue;

    await Project.updateMany(
      {
        companyId: client.companyId,
        client: client.clientName,
        user: { $ne: linkedUser._id },
      },
      { $set: { user: linkedUser._id } }
    );
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    try {
      await conn.connection.collection("users").dropIndex("role_1");
      console.log("Removed old single-admin role index");
    } catch (indexError) {
      if (indexError.codeName !== "IndexNotFound") {
        console.log("Role index cleanup skipped:", indexError.message);
      }
    }

    try {
      await backfillCompanyIds();
      console.log("Company isolation backfill complete");
    } catch (backfillError) {
      console.log("Company isolation backfill skipped:", backfillError.message);
    }

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database Connection Error:", error.message);
    console.error("Start MongoDB or update MONGO_URI in backend/.env, then save a file to let nodemon reconnect.");
    return null;
  }
};

module.exports = connectDB;
