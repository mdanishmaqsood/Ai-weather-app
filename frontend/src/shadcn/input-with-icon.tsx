import * as React from 'react';

export interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  error?: string;
  hide?: { [key: string]: boolean };
  onSearch?: (searchText: string) => void;
  placeHolder?: string;
  inputClassName?: string;
  iconClassName?: string;
  rightIconClassName?: string;
}

export const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon,
  rightIcon,
  iconPosition = 'left',
  error,
  name,
  onSearch,
  placeHolder,
  inputClassName,
  iconClassName,
  rightIconClassName,
  ...props
}) => {
  const [, setSearchText] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <div className="w-full">
      <div className="flex relative flex-row items-center ">
        {icon && iconPosition === 'left' && (
          <div
            className={`flex absolute left-3 items-center ${
              iconClassName ? iconClassName : ''
            }`}
          >
            {icon}
          </div>
        )}
        <input
          className={`form-control shadow-none ${
            error ? 'is-invalid' : ''
          }flex h-10 w-full rounded-2xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50 ${
            icon && iconPosition === 'left' ? 'pl-10' : ''
          } ${rightIcon ? 'pr-10' : ''} focus:outline-primary ${
            inputClassName ? inputClassName : ''
          }`}
          id={name}
          name={name}
          onChange={handleChange}
          placeholder={placeHolder}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className="flex absolute right-3 bottom-[2px] items-center">
            {icon}
          </div>
        )}
        {rightIcon && (
          <div
            className={`flex absolute right-3 bottom-[2px] items-center ${
              rightIconClassName ? rightIconClassName : ''
            }`}
          >
            <span className="mx-2">|</span>
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <div
          className="text-destructive"
          style={{ position: 'absolute', fontSize: '.8rem' }}
        >
          {error}
        </div>
      )}
    </div>
  );
};
