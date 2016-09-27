'use strict';

import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

var AboutMe = React.createClass({

  render: function(){

    return (
      <div className="message-box">
        <div className="row message-header">
            <div className="row inbox-header">
              <h1>About yoU<span className="white">niversity</span></h1>
            </div>
            <div className="about-youniversity-text">
              <div className="row">
                <p>The idea for <span className="orange bold">yoUniversity</span> was born while my husband, Aaron, and I were driving home from a long run in the mountains. We were reminiscing about our early days in the sport of ultrarunning, and how intimidating it had been in the beginning to tackle running really long distances. </p> <br />
                <p>I mentioned how cool it would have been if one of the many ultra-athletes in the area offered reasonably-priced clinics or classes to help newbie ultrarunners learn how to best train, fuel, and prepare mentally for the somewhat-terrifying task of running something like a 100-mile race.</p><br />
                <p>It was here in the conversation that the idea for <span className="orange bold">yoUniversity</span> sprang up. There should absolutely be a web application, we decided, that connected those with some skill or knowledge to share with those who are willing to pay for it. It would be an app, we thought, that served both the teachers and the learners, and as former teachers, we thought it should be an app that kept all of the money collected for classes right in the pockets of the instructors.</p> <br />
                <p>From my first day at Galvanize, I knew that <span className="orange bold">yoUniversity</span> would be my capstone project. I had months and months to cogitate on its purpose, audiences, form and features, and I am so stoked to have built it. As with any application, there is of course more work to be done, but I hope that your enjoyment of the site matches the pride I feel in the execution of the idea.</p> <br />

                <p className="bold">What am I most proud of here? Following are a list of the features that I encourage to you check out, both in the UI and code.</p>
                <br />
              </div>
              <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-5">
                  <ul>
                    <li>On landing page, geolocation grabs a user\s location which populates search bar</li>
                    <li>Classes can be filtered by title, location, distance from location</li>
                    <li>Search results are displayed in both list and map view</li>
                    <li>Users validated with JWT tokens upon signup and login.</li>
                    <li>Users receive email notifications when they sign up for the site, sign up for the class, receive a message from another user, or are in a class that has been updated in some way.</li>
                  </ul>
                </div>
                <div className="col-sm-5">
                  <ul>
                    <li>Between-user messaging is custom-built, with notifications when unread messages exist</li>
                    <li>user and messaging information stored with Redux for instant, server-side updates</li>
                    <li>Attention to detail. For example, most button text depends on app state. Notice how the "Log In to Sign Up" text changes depending on if a user is logged in, not the instructor, or already on the roster.</li>
                    <li>Server-side and client-side forms are validated</li>
                  </ul>
                </div>
              </div>
            </div>

        </div>
      </div>
    );
  }
});

export default AboutMe;
