import "../../css/Dashboard.css"

function DashbordCard(props) {
    return ( 
        <div 
        className={`dashboard__card dashboard--bg--${props.type}`} 
        onClick={props.handleSelect}
        style={{"boxShadow":props.isSelected ?"0 0 3px #5d6e7a" : "0 0 3px rgba(140, 140, 140, 0.5)"}}>
            <div className="dashboard__card__header">{props.header}</div>
            <div className="dashboard__card__value">{props.value}</div>
        </div>
     );
}

export default DashbordCard;