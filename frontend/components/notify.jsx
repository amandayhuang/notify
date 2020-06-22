import React from "react";
// import { Link } from "react-router-dom";
// import ReactDOM from "react-dom";
import NotifyItem from './notify_item';

class Notify extends React.Component {
  constructor(props) {
    super(props);
    // initialize notifications state to anything already in localStorage
    let localNotifications = localStorage.getItem('notifications');
    if (localNotifications) {
        localNotifications = JSON.parse(localNotifications)
    }else{
        localNotifications = {};
    }
    
    this.state = { notifications: localNotifications };
  }

  fetchRecalls() {
    $.ajax({
      url: `https://api.fda.gov/food/enforcement.json?limit=20&sort=report_date:desc`,
      method: "GET",
    })
    .then((data) => {
        let fetchedNotifications = {};
        for (let i = 0; i < data.results.length; i++) {
          const notification = data.results[i];
          notification.dismissed = false;
          if (notification.recall_number)
            fetchedNotifications[notification.recall_number] = notification;
        }
        // combine fetchedNotifications with existing notifications
        let notifications = Object.assign({},fetchedNotifications,this.state.notifications);

        // update state and localStorage
        this.setState({ notifications: notifications });
        localStorage.setItem(
          "notifications",JSON.stringify(this.state.notifications));
         })
    .catch((error) => {
        console.log(`API error`);
        return true;
        });
  }

  componentDidMount() {
    this.fetchRecalls();
  }

  render() {
    // console.log(this.state.notifications);
    return ( 
      <>
      <div className='notification-container'>
      <h1>Food Recall Notifications</h1>        
      {
        Object.values(this.state.notifications).map((notification) => (
            <NotifyItem key={notification.recall_number} notification={notification} />
        ))
       }
       </div>
      </>
    );
  }
}

export default Notify;