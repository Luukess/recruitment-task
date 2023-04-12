export const handleFilterTests = (data, selectedMethod) => {
    let allData = data;
    if (selectedMethod === 'ongoing' && data.length > 0) {
        allData = allData.filter((element) => element?.isFinished === false);
    }
    if (selectedMethod === 'finished' && data.length > 0) {
        allData = allData.filter((element) => element.isFinished === true);
    }
    return allData;
};

export const handleFilterProjectTypes = (data) => {
    const getProjects = data.map((element) => element.projectType).filter((element, idx, arr) => {
        return arr.indexOf(element) === idx;
    });
    return getProjects;
};


export const handleFilterProjects = (data, projectType, startDate, projectState ) => {
    let getProjects = data;

    if(projectType !== 'all'){
        getProjects = getProjects.filter((element) => {
            return element.projectType === projectType;
        });
    };

    if(startDate){
        getProjects = getProjects.filter((element) => {
            return element.dataStarted >= startDate;
        });
    }else{
        getProjects = getProjects;
    }

    if(projectState !== 'all'){
        getProjects = getProjects.filter((element) => {
            return element.isFinished === projectState
        });
    };

    return getProjects;
};