const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

export default {
	/**Форматирование даты
	 * @param {number|Date}
	 */
	formatDate(date) {
		let formatDate = typeof date === Date ? date : new Date(date * 1000);
		return formatDate.toLocaleDateString(options);
	},
};
