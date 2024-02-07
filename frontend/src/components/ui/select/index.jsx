import React from 'react';
import Select from 'react-select';


const Categories = ({ categories, handleChange }) => {
  categories = categories.data?.data?.map((category) => (
    { value: category.name, label: category.name }
  ));

  return (
    <>
      <Select
        placeholder="Select Categories"
        isMulti
        name="categories"
        options={categories}
        className='text-sm basic-multi-select'
        classNamePrefix="select"
        onChange={handleChange}
      />
    </>
  );
};

export default Categories;