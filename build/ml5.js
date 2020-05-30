async function handleClassifierIMG(img){
    const classifier = await ml5.imageClassifier('MobileNet')
    const predict = await classifier.predict(img)
    console.log(predict)
    return predict
}