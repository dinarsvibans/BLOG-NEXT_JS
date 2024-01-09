const RealtiveTime = (timeOfCreate: Date) => {
    const rtf1 = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const newTime = new Date().getTime();
    const oldTime= timeOfCreate.getTime();
    let timeDiff = (oldTime - newTime) / 1000; // Convert to seconds
    
    let typeOfDate: any = 'second';
    
    if (timeDiff < -60) {
      timeDiff /= 60; // Convert to minutes
      typeOfDate = 'minute';
    
      if (timeDiff < -60) {
        timeDiff /= 60; // Convert to hours
        typeOfDate = 'hour';
    
        if (timeDiff < -24) {
          timeDiff /= 24; // Convert to days
          typeOfDate = 'day';
        }
      }
    }
    
    const relTimeDiff = rtf1.format(Math.round(timeDiff), typeOfDate);
    return relTimeDiff
  }
export default RealtiveTime