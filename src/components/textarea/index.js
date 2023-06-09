import {memo, useCallback, useLayoutEffect, useState} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import './style.css';

function Textarea(props) {

  // Внутренний стейт для быстрого отображения ввода
  const [value, setValue] = useState(props.value);

  const onChangeDebounce = useCallback(
    debounce(value => props.onChangeText(value), 600),
    [props.onChangeText]
  );

  // Обработчик изменений в поле
  const onChange = (event) => {
    setValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(props.value), [props.value]);

  return (
    <textarea
      className='Textarea'
      value={value}
      placeholder={props.placeholder}
      onChange={onChange}
      onClick={props.onParentId}
    ></textarea>
  )
}

Textarea.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onParentId: PropTypes.func,
  onChangeText: PropTypes.func,
}

Textarea.defaultProps = {
  onParentId: () => {},
  onChangeText: () => {},
}

export default memo(Textarea);
