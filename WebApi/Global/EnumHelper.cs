using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Diagnostics.CodeAnalysis;
using System.Reflection;

namespace WebApi.Global
{
    public static class EnumHelper
    {
        /// <summary>
        /// Gets the string value.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>Return string</returns>
        public static string GetStringValue(this Enum value)
        {
            FieldInfo fieldInfo = value.GetType().GetField(value.ToString());
            StringValue[] attributes = (StringValue[])fieldInfo.GetCustomAttributes(typeof(StringValue), false);

            return (attributes != null && attributes.Length > 0) ? attributes[0].Value : value.ToString();
        }
    }
    /// <summary>
    /// class StringValue
    /// </summary>
    /// <seealso cref="System.Attribute" />
    public class StringValue : Attribute
    {
        private readonly string value;

        /// <summary>
        /// Initializes a new instance of the <see cref="StringValue"/> class.
        /// </summary>
        /// <param name="value">The value.</param>
        public StringValue(string value)
        {
            this.value = value;
        }

        /// <summary>
        /// Gets the value.
        /// </summary>
        /// <value>
        /// The value.
        /// </value>
        public string Value
        {
            get { return this.value; }
        }
    }
}
