import React from "react";

class NotifyItem extends React.Component {
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


export default NotifyItem;
