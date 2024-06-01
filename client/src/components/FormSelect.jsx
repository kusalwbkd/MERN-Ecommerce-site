const FormSelect = ({ label, name, list, defaultValue, size,onChange }) => {
    return (
      <div className='form-control'>
        <label htmlFor={name} className='label'>
          <span className='label-text capitalize'>{label}</span>
        </label>

        <select
          name={name}
          id={name}
          className={`select select-bordered ${size}`}
          defaultValue={defaultValue}
          onChange={onChange}
        >
            {list?.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })} 
         
        </select>
      </div>
    );
  };
  export default FormSelect;