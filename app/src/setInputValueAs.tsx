import React, { useEffect, useImperativeHandle, useRef } from 'react';
import { useForm } from 'react-hook-form';

function DefaultValues() {
  const { register, watch, setValue, handleSubmit, getValues } = useForm<any>({
    immerFormValues: true,
    defaultValues: {
      name: {
        firstName: 'firstName',
        lastName: 'lastName',
      },
      age: 11,
    },
  });
  const test = watch('name');
  let { ref, ...rest } = register('name');
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current);

  return (
    <>
      <form
        onChange={(e) => {
          console.log(e);
        }}
        onSubmit={handleSubmit((data) => {
          alert(JSON.stringify(data, null, 2));
        })}
      >
        <input {...rest} ref={inputRef} data-json="true" />
        <button type="submit">submit</button>
      </form>

      <button
        type={'button'}
        id={'toggle'}
        onClick={() => {
          setValue('name', {
            firstName: 'firstNameChanged',
            lastName: 'lastNameChanged',
          });
        }}
      >
        setValue
      </button>

      <div>{JSON.stringify(watch(), null, 2)}</div>
    </>
  );
}

export default DefaultValues;
