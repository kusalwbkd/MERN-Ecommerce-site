const FormCheckbox = ({ label, name, defaultValue, size,onChange,value }) => {
    return (
      <div className='form-control items-center'>
        <label htmlFor={name||""} className='label cursor-pointer'>
          <span className='label-text capitalize'>{label}</span>
        </label>
        <input
          type='checkbox'
          name={name}
         
          className={`checkbox checkbox-primary ${size}`}
          onChange={onChange}
          checked={value}
        />
      </div>
    );
  };
  export default FormCheckbox;