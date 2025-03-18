import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  hide?: { [key: string]: boolean };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleHide: () => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  error,
  hide,
  name,
  onChange,
  toggleHide,
  ...props
}) => {
  const inputType = hide && hide[name as string] ? 'text' : 'password';

  return (
    <div className="mt-1 mb-2 w-full">
      <div className="flex relative flex-row items-center rounded-lg ">
        <input
          className={`form-control shadow-none ${
            error ? 'is-invalid' : ''
          } mt-1 flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-primary placeholder:text-muted-foreground `}
          id={name}
          name={name}
          type={inputType}
          onChange={onChange}
          autoComplete="off"
          placeholder="Enter Your Password"
          {...props}
        />
        <div className="flex absolute right-3 bottom-3 items-center cursor-pointer">
          {hide && hide[name as string] ? (
            <EyeOff className="w-4 h-4" onClick={toggleHide} />
          ) : (
            <Eye className="w-4 h-4" onClick={toggleHide} />
          )}
        </div>
      </div>
      {error && (
        <div style={{ position: 'absolute', color: 'red', fontSize: '.8rem' }}>
          {error}
        </div>
      )}
    </div>
  );
};
