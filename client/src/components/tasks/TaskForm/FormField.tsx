import { FormFieldProps } from "utils/types";

const FormField: React.FC<FormFieldProps> = ({ id, label, value, onChange, placeholder, isTextArea }) => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-yellow-700 font-medium mb-2">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={5}
          className="w-full p-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
        ></textarea>
      ) : (
        <input
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
        />
      )}
    </div>
  );
  export default FormField; 