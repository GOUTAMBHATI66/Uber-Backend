import { cn } from '../../utils/cn';

const Label = ({ className, ...props }) => (
  <label
    className={cn(
      'text-xl font-semibold text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white',
      className
    )}
    {...props}
  />
);

export default Label;
