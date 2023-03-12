import "../../css/Dashboard.css"

function DashbordCard(props) {
    return ( 
        <div className={`dashboard__card dashboard--bg--${props.type}`} onClick={props.handleSelect}>
            <div className="dashboard__card__header">{props.header}</div>
            <div className="dashboard__card__value">{props.value}</div>
        </div>
     );
}

export default DashbordCard;