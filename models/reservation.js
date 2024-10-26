/** Reservation for Lunchly */

const moment = require("moment");

const db = require("../db");


/** A reservation for a party */

class Reservation {
  constructor({id, customerId, numGuests, startAt, notes}) {
    //  id, customer_id, start_at, num_guests, notes
    this.id = id;
    this.customerId = customerId;
    this.numGuests = numGuests;
    this.startAt = startAt;
    this.notes = notes;
  }

  /** formatter for startAt */

  getformattedStartAt() {
    return moment(this.startAt).format('MMMM Do YYYY, h:mm a');
  }

  /** given a customer id, find their reservations. */

  static async getReservationsForCustomer(customerId) {
    const results = await db.query(
          `SELECT id, 
           customer_id AS "customerId", 
           num_guests AS "numGuests", 
           start_at AS "startAt", 
           notes AS "notes"
         FROM reservations 
         WHERE customer_id = $1`,
        [customerId]
    );

    return results.rows.map(row => new Reservation(row));
  }


    /** given a reservation id, find the reservation details. */

    static async getReservation(reservationId) {
      const results = await db.query(
          'SELECT id, customer_id AS "customerId", num_guests AS "numGuests", start_at AS "startAt", notes AS "notes" FROM reservations WHERE id = $1', [reservationId]
      );
      console.log("Found Reservation:", results.rows[0]);
      return results.rows[0];
    }
}


module.exports = Reservation;
