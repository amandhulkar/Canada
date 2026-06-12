// function PrimaryButton({ children, href = '#contact', className = '', variant = 'primary' }) {
//   const styles =
//     variant === 'ghost'
//       ? 'border border-line bg-white text-ink shadow-soft hover:border-accent-blue/30 hover:bg-canvas-soft'
//       : 'bg-ink text-white shadow-soft hover:translate-y-[-1px] hover:bg-slate-900'

//   return (
//     <a
//       href={href}
//       className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-300 ${styles} ${className}`}
//     >
//       {children}
//     </a>
//   )
// }

// export default PrimaryButton

function PrimaryButton({ children, href, onClick, className = '', variant = 'primary' }) {
  const styles =
    variant === 'ghost'
      ? 'border border-line bg-white text-ink shadow-soft hover:border-accent-blue/30 hover:bg-canvas-soft'
      : 'bg-ink text-white shadow-soft hover:translate-y-[-1px] hover:bg-slate-900'

  const baseClass = `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-300 ${styles} ${className}`

  if (onClick) {
    return (
      <button onClick={onClick} className={baseClass}>
        {children}
      </button>
    )
  }

  return (
    <a
      href={href || '#contact'}
      className={baseClass}
    >
      {children}
    </a>
  )
}

export default PrimaryButton