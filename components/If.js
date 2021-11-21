const IF = ({ children, condition }) => {
  if (!condition) {
    return null
  }

  // render children if the condition is truthy
  return children
}

export default IF

/**
 * https://www.stefanjudis.com/snippets/a-react-if-component/
 *
 * Use the component as follows:
 *
 * <IF condition={condition}>
 *   <Greeter username={user.name} />
 * </IF>
 */
