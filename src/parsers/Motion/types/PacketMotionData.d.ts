import {PacketHeader} from "../../PacketHeader/PacketHeader";
import {CarMotionData} from "./CarMotionData";


export interface PacketMotionData {
    m_header: PacketHeader; // Header
    m_carMotionData: CarMotionData[]; // Data for all cars on track

    // Extra player car ONLY data
    m_suspensionPosition: number[]; // Note: All wheel arrays have the following order:
    m_suspensionVelocity: number[]; // RL, RR, FL, FR
    m_suspensionAcceleration: number[]; // RL, RR, FL, FR
    m_wheelSpeed: number[]; // Speed of each wheel
    m_wheelSlip: number[]; // Slip ratio for each wheel
    m_localVelocityX: number; // Velocity in local space
    m_localVelocityY: number; // Velocity in local space
    m_localVelocityZ: number; // Velocity in local space
    m_angularVelocityX: number; // Angular velocity x-component
    m_angularVelocityY: number; // Angular velocity y-component
    m_angularVelocityZ: number; // Angular velocity z-component
    m_angularAccelerationX: number; // Angular velocity x-component
    m_angularAccelerationY: number; // Angular velocity y-component
    m_angularAccelerationZ: number; // Angular velocity z-component
    m_frontWheelsAngle: number; // Current front wheels angle in radians
}
