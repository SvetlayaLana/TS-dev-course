type Phone = string | number;
type Birthday = string | Date;
type Address = string | undefined;

const fullName: string = "Janet Jackson";
const birthday: Birthday = new Date("2000-01-01");
const phone: Phone = "0668456543";
const address: Address = undefined;

const logUser = (fullName: string, birthday: Birthday, phone: Phone, address?: Address): void => {
    console.log("===== Current user info =====");
    console.log("Name:", fullName);
    console.log("Birthday:", typeof birthday === "string" ? birthday : birthday.toDateString());
    console.log("Phone:", phone);
    console.log("Address:", address || "--");
}

logUser(fullName, birthday, phone, address);