import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import config from '../config/config.js'


export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

    <Controller
      name={name || "content"}
      control={control}
      render={({field: {onChange}}) => (
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API}
          initialValue={defaultValue}
          init={{
            initialValue: {defaultValue},
            plugins: [
              'table powerpaste', 'lists media', 'paste'
            ],
            toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
            branding: false,
          }}
          onEditorChange={onChange}
          />
      )}
    />

     </div>
  )
}
