/* eslint-env jest */

import React from "react";
import sinon from "sinon";
import Enzyme, { mount } from "enzyme";
import Adaptor from "enzyme-adapter-react-16";

import Control from "./";

Enzyme.configure({ adapter: new Adaptor() });

describe("Control functionality", () => {
  class TestComponent extends React.Component {
    render() {
      return (
        <Control id="2018-03-12">{control => <div>{control.id}</div>}</Control>
      );
    }
  }

  test("wrapped component has a click handler", () => {
    sinon.spy(Control.prototype, "_handleClick");

    const controlledComponent = mount(<TestComponent />);
    controlledComponent.simulate("click");
    expect(Control.prototype._handleClick.callCount).toBe(1);

    Control.prototype._handleClick.restore();
  });
});
