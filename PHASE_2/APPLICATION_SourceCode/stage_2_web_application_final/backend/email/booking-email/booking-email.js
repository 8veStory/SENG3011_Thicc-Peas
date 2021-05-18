const { FRONTEND_URL } = require('../../config');

class BookingEmail {
    constructor(clinicID, pendingBookingID, clinicName, name, firstFourMedicareNum, email, dateOfAppointment,
                bookedVaccines, bookedTests) {
        this.clinicID = clinicID;
        this.pendingBookingID = pendingBookingID;
        this.clinicName = clinicName;
        this.name = name;
        this.firstFourMedicareNum = firstFourMedicareNum;
        this.email = email;
        this.dateOfAppointment = dateOfAppointment;
        this.bookedVaccines = bookedVaccines;
        this.bookedTests = bookedTests;

        // Accept link
        this.acceptLink = `${FRONTEND_URL}/clinicbooking?clinic_id=${this.clinicID}&accept=${this.pendingBookingID}`;
        console.log(this.acceptLink);

        // Reject link
        this.rejectLink = `${FRONTEND_URL}/clinicbooking?clinic_id=${this.clinicID}&reject=${this.pendingBookingID}`;
        console.log(this.rejectLink);
    }

    toString2() {
        return `
        <html>
        <body style="color:#4a4a4a;font-family:-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;" >
            <div class="banner" style="width:100%;text-align:center;height:75px;background-color:#346EEB;border-radius:5px;margin-bottom:16px;" ><a href="http://www.vacctracc.com" style="color:white;font-weight:bold;font-size:40px;margin-bottom:8px;text-decoration:none;transition:font-size 0.3s, color 0.3s;" >VaccTracc<a style="color:white;font-weight:bold;font-size:40px;margin-bottom:8px;text-decoration:none;transition:font-size 0.3s, color 0.3s;" ></div>

                <span class="intro-text" style="display:block;font-size:20px;padding-bottom:8px;" >Hi ${this.clinicName}, a new client made a booking...</span>
                <ul style="font-size:16px;list-style-type:none;margin-top:4px;margin-left:0;padding-left:8px;" >
                    <li style="padding-bottom:5px;" >Name: ${this.name}</li>
                    <li style="padding-bottom:5px;" >First 4 digits of Medicare #: ${this.firstFourMedicareNum}</li>
                    <li style="padding-bottom:5px;" >Email: ${this.email}</li>
                    <li style="padding-bottom:5px;" >Date of Appointment: ${this.dateOfAppointment}</li>
                    <li style="padding-bottom:5px;" >Booked Vaccines: ${this.bookedVaccines}</li>
                    <li style="padding-bottom:5px;" >Booked Tests: ${this.bookedTests}</li>
                </ul>

                <div class="confirmation-buttons" style="text-align: center" >
                    <a href="${this.acceptLink}"><div class="confirmation-button accept" style="padding-top:20px;padding-bottom:20px;padding-right:20px;padding-left:20px;display:inline-block;margin-left:10px;margin-right:10px;border-radius:5px;color:#F3F5FF;font-size:16px;transition:background-color 0.3s;box-shadow:1px 1px 1px #aaaaaa;background-color:#4CAF50;" >Accept Booking</div></a>
                    <a href="${this.rejectLink}"><div class="confirmation-button reject" style="padding-top:20px;padding-bottom:20px;padding-right:20px;padding-left:20px;display:inline-block;margin-left:10px;margin-right:10px;border-radius:5px;color:#F3F5FF;font-size:16px;transition:background-color 0.3s;box-shadow:1px 1px 1px #aaaaaa;background-color:#F44336;" >Reject Booking</div></a>
                </div>

                <div class="footer" style="width:100%;height:fit-content;margin-top:10px;padding-top:10px;padding-bottom:10px;background-color:#DCE9FB;text-align:center;border-radius:5px;color:gray;font-size:16px;" ><a href="http://www.vacctracc.com">VaccTracc</a>, back tracking to a virus-free world.</div>
        </body>
        </html>
        `;

    }
}

module.exports = BookingEmail;
