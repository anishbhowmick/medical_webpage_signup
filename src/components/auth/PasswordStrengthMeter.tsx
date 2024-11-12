import { cn } from "@/lib/utils";

interface PasswordStrengthMeterProps {
  password: string;
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const getStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={cn(
              "h-2 w-full rounded-full transition-all duration-500",
              {
                "bg-red-500/80": strength >= level && strength < 3,
                "bg-yellow-500/80": strength >= level && strength === 3,
                "bg-green-500/80": strength >= level && strength > 3,
                "bg-gray-200": strength < level,
              }
            )}
          />
        ))}
      </div>
      <p className={cn(
        "text-sm transition-colors duration-500",
        {
          "text-muted-foreground": strength === 0,
          "text-red-500": strength > 0 && strength < 3,
          "text-yellow-500": strength === 3,
          "text-green-500": strength > 3,
        }
      )}>
        {strength === 0 && "Enter a password"}
        {strength === 1 && "Very weak"}
        {strength === 2 && "Weak"}
        {strength === 3 && "Medium"}
        {strength === 4 && "Strong"}
        {strength === 5 && "Very strong"}
      </p>
    </div>
  );
}