import React from 'react';
import {render} from '@testing-library/react';
import Filter from '.';

describe('Filter Component', () => {
  test('should match the snapshot', () => {
    const {container} = render(<Filter label="Absence Type" menuItems={['sickness', 'vacation']} value={""}
                                       setValue={() => {
                                       }}/>);
    expect(container).toMatchSnapshot();
  });

  test('should check the options', () => {
    const view = render(<Filter label="Absence Type" menuItems={['sickness', 'vacation']}
                                value={"sickness"}
                                setValue={() => {
                                }}/>);
    expect(view.container).toMatchSnapshot();
  })
})
