
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, Eye, EyeOff, CopyCheck } from 'lucide-react';

interface PlatformKeyInputProps {
  label: string;
  value: string;
  readOnly?: boolean;
  isPassword?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  onChange?: (value: string) => void;
  onCopy?: (value: string) => void;
  copied?: boolean;
  inputType: 'url' | 'key' | 'custom';
  helperText?: string;
  placeholder?: string;
}

const PlatformKeyInput: React.FC<PlatformKeyInputProps> = ({
  label,
  value,
  readOnly = false,
  isPassword = false,
  showPassword = false,
  onTogglePassword,
  onChange,
  onCopy,
  copied = false,
  inputType,
  helperText,
  placeholder
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <div className="relative">
        <input 
          type={isPassword && !showPassword ? "password" : "text"} 
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 pl-3 pr-20 text-white"
          readOnly={readOnly}
        />
        <div className="absolute right-1 top-1 flex">
          {isPassword && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 hover:bg-meta-teal/10 text-gray-400 mr-1"
              onClick={onTogglePassword}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          )}
          {onCopy && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 hover:bg-meta-teal/10 text-gray-400"
              onClick={() => onCopy(value)}
            >
              {copied ? <CopyCheck className="h-4 w-4 text-meta-teal" /> : <Link className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>
      {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
    </div>
  );
};

export default PlatformKeyInput;
