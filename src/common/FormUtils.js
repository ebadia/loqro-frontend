import React from 'react';
import { Form, Button, TextArea, Icon, Select } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';

import moment from 'moment';
moment.locale('es');

export const TextFieldAdapter = ({ input, meta, ...rest }) => {
  // console.log('input :', input);
  // console.log('meta :', meta);
  // console.log('rest :', rest);
  return <Form.Input {...input} fluid={rest.fluid} label={rest.label} type={rest.type} />;
};

export const TextAreaAdapter = ({ input, meta, ...rest }) => {
  return <Form.Input control={TextArea} {...input} label={rest.label} />;
};

export const SelectAdapter = ({ input, meta, ...rest }) => {
  const cambia = valor => {
    input.onChange(valor.value);
  };
  return (
    <Form.Input
      control={Select}
      {...input}
      options={rest.options}
      label={rest.label}
      onChange={(event, value) => cambia(value)}
    />
  );
};

export const FileAdapter = ({ input, meta, ...rest }) => {
  return (
    <Button as="label" htmlFor="upload">
      <Icon name="upload" />
      {rest.label}
      <input hidden type="file" id="upload" onChange={e => rest.handleFile(e)} />
    </Button>
  );
};

export const DateInputAdpater = ({ input, meta, ...rest }) => {
  const cambia = valor => {
    input.onChange(valor.value);
  };
  return (
    <DateInput
      {...input}
      label={rest.label}
      dateFormat="YYYY-MM-DD"
      closeOnMouseLeave={false}
      iconPosition="left"
      onChange={(event, value) => cambia(value)}
    />
  );
};
