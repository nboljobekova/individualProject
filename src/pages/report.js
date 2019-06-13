import React, { Fragment } from "react";
import { Button } from "reactstrap";
import { List } from "antd";
import "./survey.css";

const Report = props => {

  const returnRedirect = e => {
    // e.preventDefault;
    props.history.push("/");
  };

  let result = [];
  props.state.systems.forEach(el => el.value >= el.min && result.push(el));

  return (
    <Fragment>
      <Button
        color="success"
        className="mt-2 mr-3 to_home"
        onClick={() => returnRedirect()}
      >
        Вернуться
      </Button>
      <h2 className="mt-3">
        Уважаемый(ая) {props.state.lastName + " " + props.state.firstName}!
      </h2>
      <h5 className="p-5" style={{ lineHeight: 2 }}>
        По результатам пройденного медицинского теста информируем Вас, что
        состояние Вашего здоровья в хорошей форме! Однако, рекомендовали бы Вам
        обратить внимание на следующие Ваши системы органов:{" "}
      </h5>
      <List
        itemLayout="horizontal"
        dataSource={result}
        renderItem={item => {
          console.log(item);
          return (
            <List.Item>
              <List.Item.Meta title={item.name} />
            </List.Item>
          );
        }}
      />
    </Fragment>
  );
};

export default Report;
