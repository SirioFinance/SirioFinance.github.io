import classNames from 'classnames'

const Button = ({
  children,
  className,
  disabled,
  onClick,
  type = 'primary-btn',
  style,
  ...other
}) => {
  return (
    <button
      className={classNames(type, className)}
      onClick={onClick}
      style={{
        backgroundColor: disabled
          ? '#717279'
          : type === 'primary-btn'
          ? 'rgba(0,0,0,0)'
          : '#3251bf',
        cursor: disabled && 'not-allowed',
        ...style,
      }}
      disabled={disabled}
      {...other}
    >
      {children}
    </button>
  )
}

export default Button
