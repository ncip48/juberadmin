/* eslint-disable eqeqeq */
import React from "react";

const MarkupText = (data) => {
  const { msg, chat = false, topUp = false, prefix = "%i" } = data;

  console.log(msg);

  const markupTranslate = (text) => {
    //%i = important
    // if (text.includes('%i')) {
    //   return text.split('%i');
    // }
    // if (text.includes('*')) {
    //   return text.split('*');
    // }
    let explode = text.split(prefix);
    return explode;
  };

  const RenderMarkupText = (obj) => {
    obj = obj ?? [];
    const RenderAll = obj.map((item, i) => {
      if (i % 2 == 0) {
        return <RenderNormalText msg={item} />;
      } else {
        return <RenderImportantText msg={item} />;
      }
    });
    return (
      <h5
        style={
          topUp
            ? textstyle.topUp
            : chat
            ? textstyle.normalChat
            : textstyle.normal
        }
      >
        {RenderAll}
      </h5>
    );
  };

  const RenderNormalText = (obj) => {
    const { msg } = obj;
    return (
      <h5
        style={
          topUp
            ? textstyle.topUp
            : chat
            ? textstyle.normalChat
            : textstyle.normal
        }
      >
        {msg}
      </h5>
    );
  };

  const RenderImportantText = (obj) => {
    const { msg } = obj;
    return (
      <h5
        style={
          topUp
            ? textstyle.topUpImportant
            : chat
            ? textstyle.importantChat
            : textstyle.important
        }
      >
        {msg}
      </h5>
    );
  };

  return RenderMarkupText(markupTranslate(msg));
};

const textstyle = {
  normal: {
    color: "#3F3F3F",
    //do normal style here
  },
  normalChat: {
    color: "#3F3F3F",
    lineHeight: 22,
  },
  important: {
    color: "#0688FF",
    //do important text styling here
  },
  importantChat: {
    color: "#0688FF",
    lineHeight: 22,
  },
  topUp: {
    lineHeight: 30,
    color: "#3F3F3F",
  },
  topUpImportant: {
    lineHeight: 30,
    color: "#0688FF",
  },
};

export default MarkupText;
