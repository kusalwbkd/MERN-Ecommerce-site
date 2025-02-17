const FormInput = ({ label, name, type, defaultValue, size,value,onChange}) => {
  
  return (
    <div className='form-control'>
      <label htmlFor={name} className='label'>
        <span className='label-text capitalize'>{label}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className={`input input-bordered  ${size} max-w-96`}
        value={value}
        onChange={onChange }
        
      />
    </div>
  );
};
export default FormInput;