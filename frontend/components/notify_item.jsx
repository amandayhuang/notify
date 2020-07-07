import React, { useState } from "react";

export const NotifyItemHook = (props) => {
  let notification = props.notification;
  const [isCleared, setIsCleared] = useState(notification.dismissed);
  const reportDateString = formatDate(notification.report_date);

  const clearNotification = (notification) => {
    notification.dismissed = !isCleared;
    setIsCleared(true);

    //update localStorage to reflect dismissed status
    let newLocal = {};
    newLocal[notification.recall_number] = notification;
    const oldLocal = JSON.parse(localStorage.getItem('notifications'));
    newLocal = Object.assign({}, oldLocal, newLocal);
    localStorage.setItem('notifications', JSON.stringify(newLocal));
  }

  if (isCleared === false) {
    return (
      <div className="notify-item">
        <div className="notify-left">
          <header className="recall-description">
            <h3>{notification.product_description}</h3>
          </header>
          <main className="recall-reason">
            {notification.reason_for_recall}
          </main>
        </div>
        <div className="notify-right">
          <time className="recall-date">
            {reportDateString}
          </time>
          <button onClick={() => clearNotification(notification)}>Clear</button>
        </div>
      </div>
    );
  }
  return (
    <>
    </>
  );
}

const formatDate = (textDate) => {
  textDate = textDate.slice(0, 4) + "-" + textDate.slice(4, 6) + "-" + textDate.slice(6);
  textDate = new Date(textDate);
  let reportDateString = textDate.toUTCString();
  reportDateString = reportDateString.split(" 00:00:00")[0];
  return reportDateString;
}

export class NotifyItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {notification:this.props.notification};
        this.clearNotification = this.clearNotification.bind(this);
    }

    clearNotification(){
        let newNotification = this.state.notification;
        newNotification.dismissed = true;
        this.setState({notification:newNotification});
        let newLocal = {}
        newLocal[newNotification.recall_number] = newNotification;

        //update localStorage to reflect dismissed status
        let oldLocal = JSON.parse(localStorage.getItem('notifications'));
        newLocal = Object.assign({},oldLocal,newLocal);
        localStorage.setItem('notifications',JSON.stringify(newLocal));
    }

    render() {
        let reportDate = this.state.notification.report_date;
        reportDate = reportDate.slice(0,4)+"-"+reportDate.slice(4,6)+"-"+reportDate.slice(6);
        reportDate = new Date(reportDate);
        let reportDateString = reportDate.toUTCString();
        reportDateString = reportDateString.split(" 00:00:00")[0];

        if(this.state.notification.dismissed === false) {
            return (
              <div className="notify-item">
                <div className="notify-left">
                  <header className="recall-description">
                    <h3>{this.state.notification.product_description}</h3>
                  </header>
                  <main className="recall-reason">
                    {this.state.notification.reason_for_recall}
                  </main>
                </div>
                <div className="notify-right">
                  <time className="recall-date">
                      {reportDateString}
                  </time>
                  <button onClick={this.clearNotification}>Clear</button>
                </div>
              </div>
            );
        }
        return(
            <>
            </>
        );
    }
}


// export default NotifyItem;
