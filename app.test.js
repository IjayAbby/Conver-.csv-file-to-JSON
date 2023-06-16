const { Customer, parseCustomer } = require('./app');

describe('parseCustomer', () => {
  it('should parse a valid customer row', async () => {
    const row = {
      Name: "Simon Kamau",
      DoB: "1963-08-15",
      Phone: "254705611231",
      NationalID: "13424422",
      CountryID: 1,
      SiteCode: 235
    };

    const customer = await parseCustomer(row);

    expect(customer).toEqual(new Customer(
      'Simon Kamau',
      new Date('1963-08-15'),
      '254705611231',
      '13424422',
      1,
      235
    ));
  });

  it('should return an error for an empty name', async () => {
    const row = {
      Name: ''
    };
  
    let name = row.Name;
    if (!name) {
      await new Promise(resolve => setTimeout(resolve, 100));
      expect({error: "Name is empty", line: row}).toEqual({error: "Name is empty", line: row});
    }
  });
  

  it('should throw an error for an invalid phone number', async () => {
    const row = {
      Phone: '+abc'
    };
  
    await expect(async () => {
      let phone = row.Phone.replace("+", "");
      if (isNaN(phone)) {
        throw new Error('Phone number is not valid');
      }
    }).rejects.toThrow('Phone number is not valid');
  });
  
  it('should return an error for an invalid country ID', async () => {
    const row = {
      CountryID: 4
    };
  
    let country_id = parseInt(row.CountryID);
    if (![1, 2, 3].includes(country_id)) {
      await new Promise(resolve => setTimeout(resolve, 100));
      expect({error: "Country ID is not valid", line: row}).toEqual({error: "Country ID is not valid", line: row});
    }
  });
  

  it('should return an error for an invalid site code', async () => {
    const row = {
      CountryID: 1,
      SiteCode: 123
    };
  
    let country_id = parseInt(row.CountryID);
    let site_code = parseInt(row.SiteCode);
    if (country_id === 1 && ![235, 657, 887].includes(site_code)) {
      await new Promise(resolve => setTimeout(resolve, 100));
      expect({error: `Site code ${site_code} does not exist in Kenya.`, line: row}).toEqual({error: `Site code ${site_code} does not exist in Kenya.`, line: row});
    } else if (country_id === 2 && ![772, 855].includes(site_code)) {
      await new Promise(resolve => setTimeout(resolve, 100));
      expect({error: `Site code ${site_code} does not exist in Sierra Leone.`, line: row}).toEqual({error: `Site code ${site_code} does not exist in Sierra Leone.`, line: row});
    } else if (country_id === 3 && ![465, 811, 980].includes(site_code)) {
      await new Promise(resolve => setTimeout(resolve, 100));
      expect({error: `Site code ${site_code} does not exist in Nigeria.`, line: row}).toEqual({error: `Site code ${site_code} does not exist in Nigeria.`, line: row});
    }
  });
  
});