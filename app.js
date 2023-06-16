const csvtojson = require('csvtojson');
const fs = require ('fs');

class Customer {
    constructor(name, dob, phone, id_num, country_id, site_code) {
        this.name = name;
        this.dob = dob;
        this.phone = phone;
        this.id_num = id_num;
        this.country_id = country_id;
        this.site_code = site_code;
    }
}

async function parseCustomer(row, lineNumber) {
    try {
        let name = row.Name;
        if (!name) {
            return {error: "Name is empty", line: lineNumber};
        }
        
        let dob = new Date(row.DoB);
        let formattedDob = dob.toISOString().slice(0, 10);
        
        let phone = row.Phone.replace("+", "");
        if (isNaN(row.Phone)) {
            throw new Error('Phone number is not valid');
        }
        
        let id_num = row.NationalID;
        
        let country_id = parseInt(row.CountryID);
        if (![1, 2, 3].includes(country_id)) {
            return {error: "Country ID is not valid", line: lineNumber};
        }
        
        let site_code = parseInt(row.SiteCode);
        if (country_id === 1 && ![235, 657, 887].includes(site_code)) {
            return {error: `Site code ${site_code} does not exist in Kenya.`, line: lineNumber};
        } else if (country_id === 2 && ![772, 855].includes(site_code)) {
            return {error: `Site code ${site_code} does not exist in Sierra Leone.`, line: lineNumber};
        } else if (country_id === 3 && ![465, 811, 980].includes(site_code)) {
            return {error: `Site code ${site_code} does not exist in Nigeria.`, line: lineNumber};
        }
        
        const customer = await new Customer(
            row.Name,
            formattedDob,
            phone,
            row.NationalID,
            row.CountryID,
            row.SiteCode
        );
        return customer;
    } catch (e) {
        return {error: e.toString(), line: lineNumber};
    }
}

async function parseCSV(app) {
    let rows = await csvtojson().fromFile(app);
    let result = await Promise.all(rows.map((row, index) => parseCustomer(row, index + 1)));
    return result;
}

async function main() {
    let result = await parseCSV('customers.csv');
    console.log(result);
}

main();
module.exports = { parseCustomer, Customer }