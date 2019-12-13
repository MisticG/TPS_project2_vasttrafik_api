import React,{CSSProperties} from 'react';
import Select from 'react-select';


interface option {
    value:'',
    label:''
}
interface Props {
    getvalue: (data: { value: string, label: string }) => void,
    options:option[]
}

interface State {
    selectedOption: any
}

export default class AutoSeggestion extends React.Component<Props, State> {
    
    state = {
        selectedOption: null,
    };
    handleChange = ((selected: any) => {
        console.log(selected, 'here is from auto sug')
        this.props.getvalue(selected)
    });

    render() {
        
        const { selectedOption } = this.state;
        console.log(selectedOption)

        return (
            <div style={styleAutoSuggestion}>

                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={this.props.options}
                />
            </div>
        );
    }
}
const styleAutoSuggestion:CSSProperties = {
    width:"50%"
}