import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION } from '@devexpress/dx-scheduler-core';
import { Cell } from './cell';

jest.mock('@material-ui/core/styles', () => ({
  ...jest.requireActual('@material-ui/core/styles'),
  makeStyles: jest.fn(() => () => ({
    cell: 'cell',
    text: 'text',
    horizontalCell: 'horizontalCell',
    verticalCell: 'verticalCell',
    groupedByDate: 'groupedByDate',
    verticalCellText: 'verticalCellText',
    textContainer: 'textContainer',
  })),
}));

describe('GroupingPanel', () => {
  const defaultProps = {
    group: {},
    colSpan: 1,
    left: 0,
  };
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
  });
  describe('Cell', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Cell {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is('.cell'))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Cell {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render text item', () => {
      const tree = shallow((
        <Cell {...defaultProps} />
      ));

      expect(tree.find('.text'))
        .toBeTruthy();
    });

    it('should render horizontal cell', () => {
      const tree = shallow((
        <Cell
          {...defaultProps}
          groupOrientation={HORIZONTAL_GROUP_ORIENTATION}
          groupedByDate={false}
        />
      ));

      expect(tree.is('.horizontalCell'))
        .toBeTruthy();
      expect(tree.is('.verticalCell'))
        .toBeFalsy();
      expect(tree.is('.groupedByDate'))
        .toBeFalsy();
      expect(tree.find('.verticalCellText').exists())
        .toBeFalsy();
    });

    it('should render vertical cell', () => {
      const tree = shallow((
        <Cell
          {...defaultProps}
          groupOrientation={VERTICAL_GROUP_ORIENTATION}
        />
      ));

      expect(tree.is('.horizontalCell'))
        .toBeFalsy();
      expect(tree.is('.verticalCell'))
        .toBeTruthy();
      expect(tree.is('.groupedByDate'))
        .toBeFalsy();
      expect(tree.find('.verticalCellText').exists())
        .toBeTruthy();
    });

    it('should render grouped by date cell', () => {
      const tree = shallow((
        <Cell {...defaultProps} groupedByDate />
      ));

      expect(tree.is('.horizontalCell'))
        .toBeTruthy();
      expect(tree.is('.verticalCell'))
        .toBeFalsy();
      expect(tree.is('.groupedByDate'))
        .toBeTruthy();
      expect(tree.find('.verticalCellText').exists())
        .toBeFalsy();
    });

    it('should pass colSpan and rowSpan to the root element', () => {
      const tree = shallow((
        <Cell
          {...defaultProps}
          colSpan="colSpan"
          rowSpan="rowSpan"
        />
      ));

      expect(tree.prop('colSpan'))
        .toBe('colSpan');
      expect(tree.prop('rowSpan'))
        .toBe('rowSpan');
    });

    it('should render text container', () => {
      const tree = shallow((
        <Cell {...defaultProps} />
      ));

      expect(tree.find('.textContainer').exists())
        .toBeTruthy();
    });
  });
});
