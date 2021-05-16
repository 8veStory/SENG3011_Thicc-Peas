
const admin = require('firebase-admin');
// const hash  = require("object-hash");
const { hashSHA256, saltAndHashPassword } = require('./utilities/crypto');

const FS_CLINICS_COLLECTION = "clinic";
const FS_INDIVIDUALS_COLLECTION = "individual";
const FS_INVENTORY_COLLECTION = "inventory";
const FS_HASINVENTORY_COLLECTION = "hasInventory";

/**
 * Exposes methods to access VaccTracker's FS database.
 */
class FirestoreDBLink {
    constructor(keyPath) {
        try {
            // Authenticate as a FS client using FS key.
            this._serviceAccount = require(keyPath);
        } catch (err) {
            if (err.code == "MODULE_NOT_FOUND")
                throw new Error(`Could not find FireStore key at path '${keyPath}'. Please add it in order to authenticate the FireStore client.`);
        }

        admin.initializeApp({
            credential: admin.credential.cert(this._serviceAccount)
        })

        // Connect to FireStore.
        this.db = admin.firestore();
        console.log("Successfully connected to FireStore ✅");
    }

    /**
     * 
     * @param {*} clinicjson A JSON containing clinic information to add / edit
     * @returns Outcome in a json file with the argument `result`
     */
    async setClinicAsync(contact_email, password, clinic_name, address, country, state, opening_time, closing_time) {
        let clinicID = this._createClinicID(contact_email);
        const clinic = this.db.collection(FS_CLINICS_COLLECTION).doc(clinicID);

        const clinicJSON = {
            id:            clinicID,
            contact_email: contact_email,
            password:      await saltAndHashPassword(password),
            name:          clinic_name,
            address:       address,
            country:       country,
            state:         state,
            opening_time:  opening_time,
            closing_time:  closing_time
        }

        if (await this._clinicExistsAsync(clinicID)) {
            // Check if duplicate clinic.
            throw new Error(`Clinic with email ${contact_email} already exists.`);
        }
        // Set clinic in database.
        await clinic.set(clinicJSON);

        return { success: true };
    }

    /**
     * 
     * @param {*} clinicID A string containing the clinic's ID 
     * @returns An object of the clinic's information
     */
    async getClinicAsync(email) {
        let clinicID = this._createClinicID(email);
        return await this._getClinicAsync(clinicID);
    }

    async _getClinicAsync(clinicID) {
        const clinic = (await this.db.collection(FS_CLINICS_COLLECTION).doc(clinicID).get()).data();
        return clinic;
    }

    /**
     * 
     * @returns Outcome in a json file with the argument `result`
     */
    async getClinicsAsync() {
        const clinics = await this.db.collection(FS_CLINICS_COLLECTION).get();
        let final = []
        clinics.forEach(doc => {
            final.push(doc.data());
        });

        return final;
    }

    /**
     * 
     * @param {*} individualjson A JSON containing individual information to add / edit
     * @returns Outcome in a json file with the argument `result`
     */
    async setIndividualAsync(individualjson) {
        const individual = this.db.collection(FS_INDIVIDUALS_COLLECTION).doc(individualjson.individual_id);
        let result = "Success";
        try {
            await individual.set(individualjson);
        } catch (err) {
            result = `Error: ${err}`;
        }
        return { result: result };
    }

    /**
     * 
     * @param {*} individual_id
     * @returns Outcome in a json file with the argument `result`
     */
    async getIndividualAsync(individual_id) {
        const individual = await this.db.collection(FS_INDIVIDUALS_COLLECTION).doc(individual_id).get();
        return individual;
    }

    /**
     * 
     * @param {*} inventoryjson The JSON to be added to the document
     * @param {*} clinic_id id of clinic needed
     * @param {*} quantity amount of vaccines needed
     * @returns 
     */
    async setInventoryAsync(inventoryjson, clinic_id, quantity) {
        const inventory = this.db.collection(FS_INVENTORY_COLLECTION).doc(inventoryjson.inventory_id);
        const hasinventory = this.db.collection(FS_HASINVENTORY_COLLECTION).doc(`hasInventory/${inventoryjson.inventory_id}/${clinic_id}/`)
        let result = "Success";
        try {
            await inventory.set(inventoryjson);
            await hasinventory.set({
                clinic_id: clinic_id,
                inventory_id: inventoryjson.inventory_id,
                quantity: quantity
            });
        } catch (err) {
            result = `Error: ${err}`;
        }
        return { result: result };
    }

    /**
     * 
     * @param {*} inventory_id id of inventory element to get
     * @returns json of inventory
     */
    async getInventoryByClinicAsync(clinic_id) {
        const clinic_inventory = await this.db.collection(FS_HASINVENTORY_COLLECTION).where('clinic_id', '==', clinic_id).get()
        let inventory = [];
        clinic_inventory.forEach(async doc => {
            let item = await this.db.colelction(FS_INVENTORY_COLLECTION).doc(clinic_inventory.clinic_id);
            inventory.push({
                name: item.inventory_name,
                quantity: clinic_inventory.quantity,
                type: item.type
            });
        });
        return inventory;
    }

    /**
     * 
     * @returns
     */
    async getInventoryTypeAsync(type) {
        const inventory = await this.db.collection(FS_CLINICS_COLLECTION).where("type", "==", type).get();
        let final = [];
        inventory.forEach(doc => {
            final.push(doc.data());
        });
        return final;
    }

    async clinicExistsAsync(email) {
        let clinicID = this._createClinicID(email);
        return await this._clinicExistsAsync(clinicID);
    }

    async _clinicExistsAsync(clinicID) {
        let clinic = (await this._getClinicAsync(clinicID));
        return clinic ? true : false;
    }

    _createClinicID(email) {
        return hashSHA256(email);
    }
}

module.exports = FirestoreDBLink;