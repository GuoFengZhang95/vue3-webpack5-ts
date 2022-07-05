
// export enum AuditStatus {

// }
export enum OnOff {
  on = 1,
  off = 0
}
export enum UserType {
  /**普通用户 */
  Common = 1,
  /**经纪人 */
  Agent = 2,
  /**经销商 */
  DistributorWx = 3,
  /**厂商 */
  Manufacturer = 4,
  /**分销商 */
  ManufacturerSaas = 4,
}
export enum CompanyRoles {
  /**管理员 */
  Admin = '0',
  /**普通成员 */
  CommonMember = '1',
  /**系统管理员 */
  CooAdmin = '2',
  /**主要成员 */
  MajorMember = '3',
}