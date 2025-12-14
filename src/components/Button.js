import clsx from 'clsx';
import Link from 'next/link';

export default function Button({ children, variant = 'primary', href, className, ...props }) {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900';

  const variants = {
    primary: 'text-slate-900 bg-sky-400 hover:bg-sky-500 focus:ring-sky-400',
    secondary: 'text-slate-900 bg-emerald-300 hover:bg-emerald-400 focus:ring-emerald-300',
    outline: 'text-sky-400 bg-transparent border-sky-400 hover:bg-slate-800 focus:ring-sky-400',
    danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-600',
  };

  const styles = clsx(baseStyles, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={styles} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
