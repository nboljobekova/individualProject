import React, { Fragment } from "react";
import { List } from "antd";
import "./survey.css";


const Report = (props) => {

    let result = []

    props.state.systems.forEach(el => el.value >= el.min && result.push(el))




     return (
        <Fragment>
            <h2>Уважаемый(ая) {props.state.lastName + props.state.firstName}!</h2>
            <p>По результатам пройденного медицинского теста информируем Вас, что состояние Вашего здоровья в хорошей форме! 
                Однако, рекомендовали бы Вам обратить внимание на следующие Ваши системы органов: </p> 
            <List
                itemLayout="horizontal"
                dataSource={result}
                size="large"
                renderItem={item => {
                    console.log(item)
                    
                        return (
                        <List.Item>
                            <List.Item.Meta title={item.name} />
                        </List.Item>
                        )
                }}
            />
        </Fragment>
    )
  }

export default Report;