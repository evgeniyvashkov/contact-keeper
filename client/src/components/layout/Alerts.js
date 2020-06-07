import React, { useContext } from 'react';
import { AlertContext } from '../../context/alert/context';

export const Alerts = () => {
    const { alerts } = useContext(AlertContext);

    return (
        alerts.length > 0 &&
        <div>
            {alerts.map(alert => (
                <div key={alert.id} className={`alert alert-${alert.type}`}>
                    <i className="fas fa-info-circle"></i>
                    <span>{alert.message}</span>
                </div>
            ))}
        </div>
    )
}
