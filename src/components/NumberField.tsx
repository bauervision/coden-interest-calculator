type NumberFieldProps = {
  id: string;
  label: string;
  value: number;
  min: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  helper?: string;
  onChange: (value: number) => void;
};

export function NumberField({
  id,
  label,
  value,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  helper,
  onChange,
}: NumberFieldProps) {
  return (
    <label className="field" htmlFor={id}>
      <span className="field-label">{label}</span>
      <span className="input-shell">
        {prefix ? <span className="input-affix">{prefix}</span> : null}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        {suffix ? <span className="input-affix">{suffix}</span> : null}
      </span>
      {helper ? <span className="field-helper">{helper}</span> : null}
    </label>
  );
}
