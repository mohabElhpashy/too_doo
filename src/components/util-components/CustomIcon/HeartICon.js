import React from 'react'
import CustomIcon from 'components/util-components/CustomIcon'

  const Demo = ({iconName}) => {
	return (
		<CustomIcon className="text-primary font-size-xl" svg={iconName} />
	)
}

export default Demo;