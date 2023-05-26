//Intl.NumberFormat 모듈 사용해서 가격 표시 
const FormatPrice = ({ price }) => {
    return Intl.NumberFormat("en-US", { 
        style: "currency", 
        currency: "USD",
        maximumFractionDigits:2 //소수점 2자리까지 표시
    }).format(price / 10000);
}
export default FormatPrice;