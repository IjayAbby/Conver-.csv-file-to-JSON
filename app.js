const csvtojson = require('csvtojson');

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

async function parseCustomer(row) {
    try {
        let name = row.Name;
        if (!name) {
            return {error: "Name is empty", line: row};
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
            return {error: "Country ID is not valid", line: row};
        }
        
        let site_code = parseInt(row.SiteCode);
        if (country_id === 1 && ![235, 657, 887].includes(site_code)) {
            return {error: `Site code ${site_code} does not exist in Kenya.`, line: row};
        } else if (country_id === 2 && ![772, 855].includes(site_code)) {
            return {error: `Site code ${site_code} does not exist in Sierra Leone.`, line: row};
        } else if (country_id === 3 && ![465, 811, 980].includes(site_code)) {
            return {error: `Site code ${site_code} does not exist in Nigeria.`, line: row};
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
        return {error: e.toString(), line: row};
    }
}

async function parseCSV(file) {
    let result = [];
    let rows = await csvtojson().fromFile(file);
    rows.forEach(row => {
        result.push(parseCustomer(row));
    });
    return result;
}

async function main() {
    let result = await parseCSV('customers.csv');
    console.log(result);
}

main();
module.exports = { parseCustomer, Customer }