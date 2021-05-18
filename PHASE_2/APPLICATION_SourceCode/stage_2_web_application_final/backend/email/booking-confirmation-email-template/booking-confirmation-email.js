const { FRONTEND_URL } = require('../../config');

class BookingConfirmationEmail {
    constructor(clinicID, bookingID, name, clinicName, clinicPhone, clinicEmail, clinicAddress, dateOfAppointment,
                bookedVaccines, bookedTests) {
        this.clinicID = clinicID;
        this.bookingID = bookingID;

        this.name = name;

        this.clinicName = clinicName;
        this.clinicAddress = clinicAddress;
        this.clinicPhone = clinicPhone;
        this.clinicEmail = clinicEmail;
        this.dateOfAppointment = dateOfAppointment;

        this.bookedVaccines = bookedVaccines;
        this.bookedTests = bookedTests;

        // Cancel link
        this.cancelLink = `${FRONTEND_URL}/cancelbooking?clinic_id=${this.clinicID}&cancel=${this.bookingID}`;
    }

    toString() {
        return `
<html>
<body style="color: #4a4a4a;font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;">
    <div class="banner" style="width: 100%;height: 75px;background-color: #346EEB;text-align: center;border-radius: 5px;margin-bottom: 16px;"><a href="http://www.vacctracc.com" style="color: white;font-weight: bold;font-size: 40px;margin-bottom: 8px;text-decoration: none;transition: font-size 0.3s, color 0.3s;">VaccTracc</a><a style="color: white;font-weight: bold;font-size: 40px;margin-bottom: 8px;text-decoration: none;transition: font-size 0.3s, color 0.3s;"></a></div>

    <span class="intro-text" style="display: block;font-size: 20px;padding-bottom: 8px;">Hi ${this.name}, your booking with ${this.clinicName} has been confirmed.</span>
    <ul style="font-size: 16px;list-style-type: none;margin-top: 4px;margin-left: 0;padding-left: 8px;">
        <li style="padding-bottom: 5px;">Clinic: ${this.clinicName}</li>
        <li style="padding-bottom: 5px;">Address: ${this.clinicAddress}</li>
        <li style="padding-bottom: 5px;">Contact email: ${this.clinicEmail}</li>
        ${this.clinicPhone ? `<li style="padding-bottom: 5px;">Contact phone: ${this.clinicPhone}</li>` : ''}
        <li style="padding-bottom: 5px;">Date of Appointment: ${this.dateOfAppointment}</li>
        <li style="padding-bottom: 5px;">Booked Vaccines: ${this.bookedVaccines}</li>
        <li style="padding-bottom: 5px;">Booked Tests: ${this.bookedTests}</li>
    </ul>

    <div class="cancellation-button-container" style="text-align: center;align-items: center; margin-top: 8px">
        <span class="cancel-appointment-text">Can't make the appointment? Click this button before your appointment to let them know.</span>
        <a href="${this.cancelLink}" class="cancellation-button reject" style="text-decoration: none;display: block;padding: 20px;margin-top: 10px;margin-left: 10px;margin-right: 10px;border-radius: 5px;color: #F3F5FF;font-size: 16px;text-decoration: none;transition: background-color 0.3s;box-shadow: 1px 1px 1px #aaaaaa;background-color: #F44336;">Cancel Booking</div></a>
    </div>

    <div class="footer" style="width: 100%;height: fit-content;margin-top: 10px;padding-top: 10px;padding-bottom: 10px;background-color: #DCE9FB;text-align: center;border-radius: 5px;color: gray;font-size: 16px;"><a href="http://www.vacctracc.com">VaccTracc</a>, back tracking to a virus-free world.</div>
</body>

</html>
`
    }
}

module.exports = BookingConfirmationEmail;