import React from "react";
import { mount } from "enzyme";
import { act } from 'react-dom/test-utils';
import Layout from "./index";
import { login } from "app/AuthModule";
import { getUsecaseSettings } from "app/SiteModule";
import store from "app";
import Provider from "test/TestProvider";
import { getList, setListDefaults, reset } from "app/ContentModule";

const items = [
  { __component: "component.break", title: "one" },
  {
    __component: "component.grid",
    title: "grid one",
    columns: {
      size: "1",
      content: [
        { body: 'one' },
      ],
    }
  },
  { __component: "component.markdown", title: "two" },
  { __component: "component.markdown", bodyRendered: "One two three", title: "three" },
  { __component: "component.markdown", bodyRendered: "One two three <Card />", title: "four" },
  {
    __component: "component.list",
    title: "List One",
    items: [
      { title: "one", text: "one text" },
      { title: "two", text: "two text" },
    ],
  },
  { __component: "component.callout", fullwidth: true, title: "five" },
  { __component: "component.callout", title: "six", items: [
    {
      className: 'one',
      body: 'one',
    },

  ]},
  {
    __component: "component.cards",
    title: "seven",
    cardItem: [
      { className: "card-one", body: "one" }
    ]
  },
  { __component: "component.title", title: "eight" },
  { __component: "component.title", title: "eight two", subtitle: 'subtitle' },
  { __component: "component.title", subtitle: 'subtitle two' },
  {
    __component: "component.links",
    title: "nine",
    items: [
      { text: 'one', link: '/one' },
    ],
  },
  { __component: "component.content-list", title: "ten", template: 'usecase' },
  {
    __component: "component.content-list",
    title: "eleven",
    type: 'usecases',
    template: 'usecase',
    defaultLayout: 'horizontal',
    filter: true,
  },
  {
    __component: "component.content-list",
    title: "tweleve",
    type: 'bok',
    template: 'bok',
    defaultLayout: 'vertical',
  },
  { __component: "component.bad-component" },
];

const usecases = [
  {
    __component: "component.content-list",
    title: "eleven",
    type: 'usecases',
    template: 'usecase',
    defaultLayout: 'horizontal',
    filter: true,
  },
  {
    __component: "component.content-list",
    title: "fourteen",
    type: 'usecases',
    template: 'usecase',
    defaultLayout: 'vertical',
    filter: true,
  },
];

const boks = [
  {
    __component: "component.content-list",
    title: "tweleve",
    type: 'bok',
    template: 'bok',
    defaultLayout: 'vertical',
    filter: true,
    sort: true,
    defaultFilter: [
      {
        name: 'metadataAgency',
        value: [
          'BLS'
        ],
        operand: 'eq',
        type: 'enumeration'
      }
    ],
  },
];

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/example/path",
    search: "?metadataProcurement=developedInHouse",
  })
}));

describe("<Layout />", () => {
  describe("default render", () => {
    it("should render", async () => {
      await store.dispatch(login({ token: "test" }));
      await store.dispatch(getUsecaseSettings());
      await store.dispatch(setListDefaults({type: 'usecases' }));
      await store.dispatch(getList());
      const wrapper = mount(
        <Provider>
          <Layout items={items} />
        </Provider>
      );
      expect(wrapper.find(".grid-container").hostNodes().length).toBe(15);
    });

    it("should render content lists", async () => {
      await store.dispatch(login({ token: "test" }));
      await store.dispatch(getUsecaseSettings());
      await store.dispatch(setListDefaults({type: 'usecases' }));
      await store.dispatch(getList());
      const wrapper = mount(
        <Provider>
          <Layout items={usecases} />
        </Provider>
      );
      wrapper.find('.USContentList__header .USContentList__filter--reset').at(0).simulate('click');
      expect(wrapper.find(".grid-container").hostNodes().length).toBe(2);
    });

    it("should render content lists", async () => {
      await store.dispatch(login({ token: "test" }));
      await store.dispatch(getUsecaseSettings());
      await store.dispatch(setListDefaults({type: 'bok' }));
      const wrapper = mount(
        <Provider>
          <Layout items={boks} />
        </Provider>
      );
      expect(wrapper.find(".grid-container").hostNodes().length).toBe(1);
    });
  });
});
