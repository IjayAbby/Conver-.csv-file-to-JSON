# How to convert CSV to JSON in Node.js

Write a program that takes a CSV file as input, and returns either a Customer record or an error for each row. 
A customer record has the following fields:
```
Name: string
Date of birth: date
Telephone number: string
ID number: string
Country ID: integer 
Site ID: integer
```

## Built With

- Node JS

## Getting Started

- Clone the repo `https://github.com/IjayAbby/Convert-CSV-file-to-JSON.git`
- cd into `Convert-CSV-file-to-JSON`
- Run `git pull origin main`
- On the terminal run:
  - `` npm install`` to get a copy of the packages in your local environment

### Run Code
- Using sample input in the ```customers.csv file```
- Open your terminal and type ```node app.js```. 
- Sample output:
```
[
	{
		Name: "Simon Kamau",
		DoB: "1963-08-15",
		Phone: "254705611231",
		NationalID: "13424422",
		CountryID: 1,
		SiteCode: 235
	},
	{
		error: "Site code 657 does not exist in Sierra Leone.",
		line: 2
	}
]
```

### Run Tests
- Open your terminal and type ```jest```

## Author

👤 **Ijay Abby**

- Github: [@githubhandle](https://github.com/IjayAbby)
- Twitter: [@twitterhandle](https://twitter.com/Ijay_js)
- Linkedin: [linkedin](https://www.linkedin.com/in/ijayabby4/)

## 🤝 Contributing

Contributions, issues and feature requests are always welcome!

I love meeting other developers, especially ones that give me advice on how to improve my work.

Feel free to check the [issues page](https://github.com/IjayAbby/Convert-CSV-file-to-JSON/issues).

### How to Contribute

To get a local copy up and running follow these simple example steps.

```
- Fork the repository
- git clone https://github.com/IjayAbby/Convert-CSV-file-to-JSON.git
- git checkout main
- git checkout -b branch name
- git remote add upstream https://github.com/IjayAbby/Convert-CSV-file-to-JSON
- git pull upstream main
- git commit -m "commit message"
- git push -u origin HEAD
```

## Show your support

Finally, if you've read this far, don't forget to give this repo a ⭐️. They're free . . . I think.

## Acknowledgments

- [Blog Post](https://attacomsian.com/blog/nodejs-convert-csv-to-json)
- [Jest](https://jestjs.io/) for unit testing.
- [Csvtojson](https://www.npmjs.com/package/csvtojson) module.
- [Test Csv files](https://www.convertcsv.com/csv-to-json.htm)

## 📝 License

This project is [MIT](https://github.com/IjayAbby/Convert-CSV-file-to-JSON/blob/main/LICENSE) licensed.
