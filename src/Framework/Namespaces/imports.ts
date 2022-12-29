import Component from "../Component/Component";
import FrameworkRender from "./render-namespace";

export type ValueDefault = FrameworkRender.tAnyObject;
export type ClassComponent = Component;

export type ReducerAction = {
  [index: string]: any,
  type: string,
  payload?: any
};